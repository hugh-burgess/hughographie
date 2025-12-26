export default function Footer({ blok }) {
console.log('Footer blok:', blok);
    if (!blok || Object.keys(blok).length === 0) {
        return <footer><p>Footer (No data)</p></footer>;
    }

    return (
        <footer>
            <a href="https://www.github.com/hugh-burgess" target="_blank">Github</a>
            <div>{blok.nav?.map((navItem) => <a key={navItem.id} href={navItem.link?.cached_url || '#'}>{navItem.title}</a>)}</div>
        </footer>
    );
}
