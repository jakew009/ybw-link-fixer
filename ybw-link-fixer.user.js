// ==UserScript==
// @name         YBW Broken Link Fixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  YBW can't be bothered to fix the old links on the forum, so this script will do it for you.
// @author       Jake Withecombe
// @include      http://forums.ybw.com*
// @include      https://forums.ybw.com*
// @grant        none
// ==/UserScript==

(function () {
    'use strict'

    const extractThreadId = (url) => {
        const result = /https?:\/\/www.ybw.com\/forums\/showthread.php\?(\d+)/.exec(url)
        if (result) return result[1]
        return false
    }

    const rewriteThreadUrl = (threadId) => {
        return `https://forums.ybw.com/index.php?threads/${threadId}`
    }

    const links = [...document.links]

    links.forEach((link) => {
        const threadId = extractThreadId(link.href)
        if (threadId) {

            console.log("thread id", threadId)
            link.href = rewriteThreadUrl(threadId)
            link.text = rewriteThreadUrl(threadId)
            console.log("new link", link.href)
        }
    })

})()