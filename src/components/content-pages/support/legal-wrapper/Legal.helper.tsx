export const generateLegalPageContent = (content: any, numbering: string|number) => {

    return (<div>

        {
            content.map((c: any, index: number )=> {
                return (
                    <div className="content-body">
                        <div className="numbering">
                            
                        </div>
                        <div className="paragraphs">
                            {
                                c.type === "list" ?
                                (
                                    c.text.constructor === Object ?
                                        <ul> 
                                            {
                                                (Object.keys(c.text).map(key => {
                                                    return <li>
                                                                <div className="key">{key}</div>
                                                                <div className="value">{c.text[key]}</div>
                                                        </li>
                                                }))
                                            }
                                        </ul> :
                                        <ul>
                                            {
                                                (c.text).map((text: any) => {
                                                    return <li>{text}</li>
                                                })
                                            }
                                        </ul>
                                )
                                :
                                c.text.map((text: any) => (
                                    <p>{text}</p>
                                ))
                            }
                            {
                                c.subcontent ? generateLegalPageContent(c.subcontent, numbering + '.' + (index + 1)) : ""
                            }
                        </div>
                    </div>
                )
            })
        }
    </div>)
}