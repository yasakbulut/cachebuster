// SAMPLE
this.manifest = {
    "name": "Cachebuster",
    "icon": "/icons/Network48.png",
    "settings": [
        {
            "tab": i18n.get("main"),
            "group": i18n.get("blacklist"),
            "name": "description",
            "type": "description",
            "label": i18n.get("url-list"),
            "text": i18n.get("description")
        },
        {
            "tab": i18n.get("main"),
            "group": i18n.get("blacklist"),
            "name": "url",
            "type": "text",
            "label": i18n.get("url-list"),
            "text": i18n.get("url-placeholder")
        }
    ],
    "alignment": [
        [
            "url"
        ]
    ]
};
