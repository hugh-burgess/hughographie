const C2RichText = ({ content, className }) => {
    if (!content) return null;

    const richtext = Array.isArray(content) ? content : content.content;

    function renderContent(contentArray, parentKey) {

        return contentArray.map((item, index) => {
            const key = `${parentKey}-${index}`;
            switch (item.type) {
                case 'hard_break':
                    return <br />
                case 'paragraph':
                    return (
                        <p key={key}>
                            {item.content ? renderContent(item.content, key) : null}
                        </p>
                    );

                case 'text': {
                    let content = item.text;

                    item.marks?.forEach((mark) => {
                        switch (mark.type) {
                            case 'italic':
                                content = <i key={`${key}-italic`}>{content}</i>;
                                break;
                            case 'bold':
                                content = <strong key={`${key}-bold`}>{content}</strong>;
                                break;
                            case 'link':
                                content = <a target={mark.attrs.target} href={mark.attrs.href} key={`${key}-link`}>{content}</a>;
                                break;
                            default:
                                break;
                        }
                    });

                    return content;
                }

                case 'heading':
                    const HeadingTag = `h${item.attrs?.level || 2}`;
                    return (
                        <HeadingTag key={key}>
                            {item.content ? renderContent(item.content, key) : null}
                        </HeadingTag>
                    );

                case 'blockquote':
                    return (
                        <blockquote key={key}>
                            {item.content ? renderContent(item.content, key) : null}
                        </blockquote>
                    );

                default:
                    return null;
            }
        });
    }

    return <div className={`${className || ""} rich-text`}>{renderContent(richtext, 'rt')}</div>;
};

export default C2RichText;