module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily:{
                source_code_pro: ["Source Code Pro"],
                roboto: ["Roboto"],
                Inter: ["Inter"],
                Rubik: ["Rubik"]
            },
            colors: {
                'active-purple' : '#5F2EEA',
                'primary': '#0D0D2B',
                'secondary': '#2B076E',
                'danger': '#E3342F',
            },
            width: {
                '1/7': '14.2857143%',
                '2/7': '28.5714286%',
                '3/7': '42.8571429%',
                '4/7': '57.1428571%',
                '5/7': '71.4285714%',
                '6/7': '85.7142857%',
                '1/20': '5%',
                '1/10': '10%',
                '3/20': '15%',
                '3/10': '30%',
                '7/20': '35%',
                '9/20': '45%',
                '11/20': '55%',
                '13/20': '65%',
                '7/10': '70%',
                '8/10': '80%',
                '17/20': '85%',
                '9/10': '90%',
                '19/20': '95%',
            }
        },
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#0D0D2B',
            'secondary': '#2B076E',
            'danger': '#E3342F',
            'custom-gray': '#EFF0F6',
            'custom-blue': '#3671E9',
            'custom-green': '#6FCF97'
        })
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
