const { wait } = require("@testing-library/user-event/dist/utils");
const fs = require("fs");
const path = require("path");
require('dotenv').config()

const IMAGE_DIR = path.join(__dirname, "../public/assets/images");

const STORYBLOK_TOKEN = process.env.REACT_APP_STORYBLOK_DELIVERY_API_TOKEN;

if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}


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
    const destination = path.join(IMAGE_DIR, filename);

    if (fs.existsSync(destination)) {
        console.log(`Skipping ${filename}: already exists in asset folder.`);
        return;
    }

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    fs.writeFileSync(destination, Buffer.from(buffer));

    console.log(`Downloaded ${filename}`);
}


async function run() {
    const stories = await getStories();

    const images = [];

    stories?.forEach(story => {
        findImages(story, images);
    });

    const uniqueImages = [...new Set(images)];

    console.log(`Found ${uniqueImages.length} images`);

    wait()

    for (const image of uniqueImages) {
        await downloadImage(image);
    }


}


run();