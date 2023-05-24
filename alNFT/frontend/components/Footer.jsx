import React from 'react';
import colors from "../colors";

const Footer = () => {
    return (
        <>
            <div
                style={{
                    color: colors.const_light_text,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '40px',
                    fontSize: '14px',
                }}>
                <a
                    href="https://github.com/abdibrokhim/cw3d-AlchemySDK"
                    target="_blank"
                    rel="noreferrer"
                    >
                        Open Source
                </a>
                <a
                    href="https://twitter.com/abdibrokhim"
                    target="_blank"
                    rel="noreferrer"
                    >
                        Twitter
                </a>
                <a
                    href="https://linkedin.com/in/abdibrokhim"
                    target="_blank"
                    rel="noreferrer"
                    >
                        LinkedIn
                </a>
            </div>
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                    paddingBottom: '10px',
                    color: colors.const_light_text,
                    fontSize: '13px',
                }}>
                    Made with 💙 by the AlchemyFam
            </div>
        </>
    );
};

export default Footer;