module.exports = (Mock) => {
    const Random = Mock.Random;
    Mock.mock('/api/data','post', (req, res) => {
        return Mock.mock({
            "data|10-20":[{
                'id': '@increment',
                "xing|1-10": "★",
                "ico":Random.image('200x100'),
                "startDate":Random.date('yyyy-MM-dd'),
                "CPU|1": [
                    "AMD",
                    "CMD",
                    "UMD"
                ]
            }]
        })
    })

    Mock.mock('/api/index','post', (req, res) => {
        return Mock.mock({
            "data":{
                msg:'自定义的多页脚手架'
            }
        })
    })
    Mock.mock('/api/k','get', (req, res) => {
        return Mock.mock({
            "data":{
                price:3215,
                'k': '@float(2893.5, 3536.5,0,2)'
            }
        })
    })
}