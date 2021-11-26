import * as React from "react";

export function ContactsPage() {
        return (
            <div>
                <h1>Contacts</h1>
                <hr />
                <div className="app-text">
                    <div className="pull-left app-text-thumbnail">
                        <img className="img-thumbnail" alt="Volodymyr Vreshch" width={200} height={200} src="/mphoto.jpeg" />
                    </div>
                    <p>Homepage: <a href="http://vreshch.com/" target="_blank" rel="noreferrer">vreshch.com</a></p>
                    <p>Email: vreshch@gmail.com</p>
                    <p>Skype: vreshch.work</p>
                    <p>Tel: +38(096)337-87-**</p>
                    <p>Linkedin: <a href="https://www.linkedin.com/in/vreshch-volodymyr-3969498a" target="_blank" rel="noreferrer">Volodymyr Vreshch</a></p>
                    <p>Github: <a href="https://github.com/vreshch" target="_blank" rel="noreferrer">vreshch</a></p>

                </div>
            </div>
        );
};
