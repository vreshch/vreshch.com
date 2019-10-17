import * as React from "react";

// tslint:disable:max-line-length
export const ChemistryJSPage = () => {
    return (
            <div>
                <h1>Chemistry JS</h1>
                <hr />
                <div className="app-text">
                    <p>Open source project
                        <a href="http://crystallography-online.com" target="_blank">@chemistry</a>;
                        that has a goal to facilitate development in cheminformatics and crystallography
                        fields with help of JavaScript / TypeScript</p>
                    <p>Libraries list :</p>
                    <dl>
                        <dt><a href="https://github.com/chemistry/chem-js-lib/tree/master/packages/math" target="_blank">@chemistry/math</a></dt>
                        <dd>Math library that facilitate linear algebra calculations;
                          Include classes: Vec3, Matrix3x3, Matrix3x4, Transform3d, Quaternion</dd>
                    </dl>
                    <dl>
                        <dt><a href="https://github.com/chemistry/chem-js-lib/tree/master/packages/elements" target="_blank">@chemistry/elements</a></dt>
                        <dd>Information about elements</dd>
                    </dl>
                    <dl>
                        <dt><a href="https://github.com/chemistry/chem-js-lib/tree/master/packages/space-groups" target="_blank">@chemistry/space-groups</a></dt>
                        <dd>List of Spacegroups in JSON</dd>
                    </dl>
                </div>
            </div>
        );
};
