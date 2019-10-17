import * as React from "react";

export const NotFoundPage = () => {
        return (
            <div>
                <h1 className="text-danger">Error 404</h1>
                <hr />
                <div className="app-text">
                    <p className="text-danger"><b>Sorry, the site you requested was not found.</b>
                    &nbsp;Please check the URL for proper spelling and capitalization.</p>
                </div>
            </div>
        );
};
