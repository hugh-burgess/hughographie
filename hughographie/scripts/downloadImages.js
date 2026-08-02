const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
require("dotenv").config();

const IMAGE_DIR = path.join(__dirname, "../public/assets/images");
const CACHE_DIR = path.join(__dirname, "../cache");
const MANIFEST = path.join(CACHE_DIR, "imageManifest.json");

const STORYBLOK_TOKEN = process.env.REACT_APP_STORYBLOK_DELIVERY_API_TOKEN;

const SIZES = [500, 800, 1200, 1500];

// -----------------------------------------------------------------------------
// Ensure directories/files exist
// -----------------------------------------------------------------------------
if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

if (!fs.existsSync(MANIFEST)) {
    fs.writeFileSync(MANIFEST, "{}");
}

const manifest = JSON.parse(
    fs.readFileSync(MANIFEST, "utf8")
);

// -----------------------------------------------------------------------------
// Fetch stories
// -----------------------------------------------------------------------------
async function getStories() {
    const response = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?version=draft&token=${STORYBLOK_TOKEN}&per_page=100`
    );

    const data = await response.json();

    return data.stories;
}

// -----------------------------------------------------------------------------
// Find Storyblok images
// -----------------------------------------------------------------------------
function findImages(obj, images = []) {
    if (!obj || typeof obj !== "object") {
        return images;
    }

    Object.entries(obj).forEach(([key, value]) => {

        if (
            key === "filename" &&
            typeof value === "string" &&
            value.includes("storyblok")
        ) {
            images.push(obj);
        }

        if (typeof value === "object") {
            findImages(value, images);
        }
    });

    return images;
}

// -----------------------------------------------------------------------------
// Save manifest
// -----------------------------------------------------------------------------
function saveManifest() {
    fs.writeFileSync(
        MANIFEST,
        JSON.stringify(manifest, null, 2)
    );
}

// -----------------------------------------------------------------------------
// Process image
// -----------------------------------------------------------------------------
async function downloadImage(image) {

    const {
        id,
        filename: url
    } = image;


    // Safety check
    if (!id || !url) {
        console.log("Skipping invalid image");
        return;
    }


    const filename = path.basename(url.split("?")[0]);

    const ext = path.extname(filename);
    const base = path.basename(filename, ext);


    const outputs = SIZES.map(width =>
        path.join(
            IMAGE_DIR,
            `${base}-${width}${ext}`
        )
    );


    // -------------------------------------------------------------
    // Check actual files first
    // -------------------------------------------------------------
    const alreadyProcessed = outputs.every(file =>
        fs.existsSync(file)
    );

    if (alreadyProcessed) {

        if (!manifest[id]) {
            manifest[id] = {
                filename,
                base,
                sizes: SIZES,
                processedAt: new Date().toISOString()
            };

            saveManifest();
        }
        return;
    }


    // -------------------------------------------------------------
    // Manifest exists but files are missing
    // -------------------------------------------------------------
    if (manifest[id]) {
        console.log(`Missing files detected for ${filename}, rebuilding...`);
    }


    // -------------------------------------------------------------
    // Download original
    // -------------------------------------------------------------
    console.log(`Downloading ${filename}`);

    const response = await fetch(url);

    if (!response.ok) {
        console.error(`Failed downloading ${url}`);
        return;
    }


    const buffer = Buffer.from(
        await response.arrayBuffer()
    );


    // Save original
    fs.writeFileSync(
        path.join(IMAGE_DIR, filename),
        buffer
    );


    // -------------------------------------------------------------
    // Generate sizes
    // -------------------------------------------------------------
    for (const width of SIZES) {

        const output = path.join(
            IMAGE_DIR,
            `${base}-${width}${ext}`
        );


        if (fs.existsSync(output)) {
            continue;
        }


        await sharp(buffer)
            .resize({
                width,
                withoutEnlargement: true
            })
            .toFile(output);


        console.log(
            `Created ${base}-${width}${ext}`
        );
    }


    // -------------------------------------------------------------
    // Update manifest
    // -------------------------------------------------------------
    manifest[id] = {
        filename,
        url,
        base,
        sizes: SIZES,
        processedAt: new Date().toISOString()
    };


    saveManifest();
}


// -----------------------------------------------------------------------------
// Run
// -----------------------------------------------------------------------------
async function run() {

    const stories = await getStories();

    const images = [];


    stories.forEach(story => {
        findImages(story, images);
    });


    const uniqueImages = [
        ...new Map(
            images.map(image => [
                image.id,
                image
            ])
        ).values()
    ];


    console.log(
        `Found ${uniqueImages.length} unique images`
    );


    for (const image of uniqueImages) {
        await downloadImage(image);
    }


    console.log("Done.");
}


run().catch(console.error);