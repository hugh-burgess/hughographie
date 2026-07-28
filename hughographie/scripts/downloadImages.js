const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
require("dotenv").config();

const IMAGE_DIR = path.join(__dirname, "../public/assets/images");

const STORYBLOK_TOKEN = process.env.REACT_APP_STORYBLOK_DELIVERY_API_TOKEN;

if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

const SIZES = [500, 800, 1200, 1500];

async function getStories() {
    const response = await fetch(
        `https://api.storyblok.com/v2/cdn/stories?version=draft&token=${STORYBLOK_TOKEN}&per_page=100`
    );

    const data = await response.json();
    return data.stories;
}

function findImages(obj, images = []) {
    if (!obj || typeof obj !== "object") return images;

    Object.entries(obj).forEach(([key, value]) => {
        if (
            key === "filename" &&
            typeof value === "string" &&
            value.includes("storyblok")
        ) {
            images.push(value);
        }

        if (typeof value === "object") {
            findImages(value, images);
        }
    });

    return images;
}

async function downloadImage(url) {
    const filename = path.basename(url.split("?")[0]);

    const ext = path.extname(filename);
    const base = path.basename(filename, ext);

    // We'll use the 1200px version as the "already processed" check.
    const checkFile = path.join(IMAGE_DIR, `${base}-1200${ext}`);

    if (fs.existsSync(checkFile)) {
        console.log(`Skipping ${filename}: already processed.`);
        return;
    }

    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());

    // Optional: save the original as well
    fs.writeFileSync(path.join(IMAGE_DIR, filename), buffer);

    for (const width of SIZES) {
        const output = path.join(
            IMAGE_DIR,
            `${base}-${width}${ext}`
        );

        await sharp(buffer)
            .resize({
                width,
                withoutEnlargement: true,
            })
            .toFile(output);

        console.log(`Created ${base}-${width}${ext}`);
    }
}

async function run() {
    const stories = await getStories();

    const images = [];

    stories.forEach((story) => {
        findImages(story, images);
    });

    const uniqueImages = [...new Set(images)];

    console.log(`Found ${uniqueImages.length} images`);

    for (const image of uniqueImages) {
        await downloadImage(image);
    }

    console.log("Done.");
}

run();