module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily:{
                source_code_pro: ["Source Code Pro"],
                roboto: ["Roboto"]
            }
        },
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#0D0D2B',
            'secondary': '#2B076E',
            'danger': '#e3342f',
        })
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
