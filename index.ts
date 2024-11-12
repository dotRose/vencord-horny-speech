/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// Needed header for all plugins

import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";

const pluginSettings = definePluginSettings({});

export default definePlugin({
    name: "Horny Speech",
    description: "Converts all your messages to Horny Speech",
    authors: [
        {
            name: "dotnetapplication",
            id: 742320392101822555n,
        },
    ],
    settings: pluginSettings,
    async start() {
        this.preSend = addPreSendListener((_channelId, msg) => {
            const newContent = this.transformText(msg.content);
            msg.content = newContent;
        });
    },
    stop() {
        removePreSendListener(this.preSend);
    },
    transformText(text: string) {
        const lewdWords = {
            need: "crave",
            want: "desire",
            talk: "whisper",
            hold: "caress",
            touch: "stroke",
            feel: "indulge",
            like: "lust after",
            meet: "get close",
            see: "gaze at",
            hear: "listen to",
        };
        const sounds = [
            "*breathes deeply*",
            "*sighs*",
            "*whispers*",
            "*moans softly*",
            "*whimpers*",
        ];

        let words = text.split(" ");
        words = words.map((word, index) => {
            if (Math.random() < 0.7) {
                let lewdWord = lewdWords[word.toLowerCase()] || word;

                const effect = Math.floor(Math.random() * 3);
                switch (effect) {
                    case 0: // Stuttering
                        lewdWord = lewdWord.charAt(0) + "- " + lewdWord;
                        break;
                    case 1: // Random sound
                        lewdWord = `${
                            sounds[Math.floor(Math.random() * sounds.length)]
                        } ${lewdWord}`;
                        break;
                        //case 2: // Elongated vowels
                        lewdWord = lewdWord.replace(
                            /[aeiou]/g,
                            (vowel) => vowel + vowel.repeat(2)
                        );
                        break;
                }
                return lewdWord;
            }
            return word;
        });
        const transformedText = words.join(" ");

        return transformedText;
    },
});