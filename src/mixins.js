import axios from "axios";

export default {
    methods: {
        async $api(url, methods, data) {
            return (
                await axios({
                    method: methods,
                    url,
                    data,
                }).catch((e) => {
                    console.log(e);
                })
            ).data;
        },
    },
};
