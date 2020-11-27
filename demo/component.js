const { defineComponent } = require('san')

module.exports = defineComponent({
    computed: {
        name: function () {
            const f = this.data.get('firstName')
            const l = this.data.get('lastName')
            return `${f} ${l}`
        }
    },
    template: '<div><h1>{{name}}</h1></div>'
})
