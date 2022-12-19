import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CookieConsent from "react-cookie-consent";

export default function Cookies() {
    return (
    <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="UserAllowedCookies"
        style={{ background: "#1F2937" }}
        buttonStyle={{ color: "#ffffff", fontSize: "15px", background: "#3B1ED8" }}
        expires={150}
        >
        This website uses cookies to enhance the user experience.{" "}
        {/* <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span> */}
    </CookieConsent>
    );
}