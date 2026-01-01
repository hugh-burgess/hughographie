const C2RichText = ({ content, className }) => {
    if (!content) return null;

    const richtext = Array.isArray(content) ? content : content.content;

    function renderContent(contentArray, parentKey) {
        if (!contentArray) return null;

        return contentArray.map((item, index) => {
            const key = `${parentKey}-${index}`;
            switch (item.type) {
                case 'paragraph':
                    if (!item.content) {
                        return <br key={key} />;
                    }
                    return (
                        <p key={key}>
                            {item.content ? renderContent(item.content, key) : null}
                        </p>
                    );

                case 'text':
                    return <span key={key}>{item.text}</span>;

                case 'hard_break':
                    return <br key={key} />;

                case 'heading':
                    const HeadingTag = `h${item.attrs?.level || 2}`;
                    return (
                        <HeadingTag key={key}>
                            {item.content ? renderContent(item.content, key) : null}
                        </HeadingTag>
                    );

                case 'bullet_list':
                    return (
                        <ul key={key}>
                            {item.content ? renderContent(item.content, key) : null}
                        </ul>
                    );

                case 'ordered_list':
                    return (
                        <ol key={key}>
                            {item.content ? renderContent(item.content, key) : null}
                        </ol>
                    );

                case 'list_item':
                    return (
                        <li key={key}>
                            {item.content ? renderContent(item.content, key) : null}
                        </li>
                    );

                case 'blockquote':
                    return (
                        <blockquote key={key}>
                            {item.content ? renderContent(item.content, key) : null}
                        </blockquote>
                    );

                case 'horizontal_rule':
                    return <hr key={key} />;

                default:
                    return null;
            }
        });
    }

    return <div className={`${className || ""} rich-text`}>{renderContent(richtext, 'rt')}</div>;
};

export default C2RichText;