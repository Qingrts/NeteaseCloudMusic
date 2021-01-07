import React from 'react';


export default class Artist extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {};


  }
  componentDidMount(){

    let formData = new FormData();
    formData.append("params", "+rU5R+qnLiUnuaWj/eankJ1IMIebBEcnjIwMwOtbhBvH7OtS4KRvbKa1tq6hBAwoeS+O6ejMmyp2fYFVUcJATQdNXcExDgfuHRdAv3WeZ7D9txkrJ3GPk/YzEj/h7VXaWl9GDqMlab79pRQ8wvJU/QrIA5UWPrQayX1bCZEx3e+kQUN2NoJCltVM2FH5pY3GT+cxvH4jpjAojoqK84zPMarRvoZ665VW0Q2mg0AiGYw=");
    formData.append("encSecKey", "c0ab5dbb6a65c8dee231721f20bed109751812d0041fc625d49469c7bfce0ce2e9561d55eaeab657fd982e8d151b817c3f789f89f136c1233a440940ef330679edcabfd9603a18e2bea064468a38ce601c674bb07484b1576bf06bf5f7b0eeac9db06f740e6eda589bd07d55b81bc4293648abaa88abec70a6559f9343410c5f");
    this.getArtistList(formData);
  }
  getArtistList = (formData) => {
    fetch("http://music.163.com/weapi/artist/list?csrf_token=", {
      Header: {
        ":authority": "music.163.com",
        ":method": "POST",
        ":path": "/weapi/artist/list?csrf_token=a7418c329263ef11f7d00f3e8746df04",
        ":scheme": "https",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-length": "530",
        "content-type": "x-www-form-urlencoded;charset=UTF-8",
        "cookie": "NMTID=00OUh2HlIfynWHG5UUZmJK7U243cgUAAAF225b3Sg; JSESSIONID-WYYY=SsV%2F9RWmsyK7pM7W8GysY2njNUDjvj%2FlCN7o%2BVssfyFXNlUWczREykiAxx%2BYx3yBufD2RMPmcqMYpK%2BDnYPk5Dt2aJY%5CCdrBj%2FesHsgdUcZtTtyJDjx7cpQa%2BD5xTIcV2KOqNgWQapq7HJjDFf4EMWSAiAorhjUc6xJU2GV73uvVF0yE%3A1610004175422; _iuqxldmzr_=32; _ntes_nnid=f400cfe9ef7433a3ee8c6c968dbce685,1610002375460; _ntes_nuid=f400cfe9ef7433a3ee8c6c968dbce685; WEVNSM=1.0.0; WNMCID=ptmxrj.1610002376510.01.0; WM_NI=Frg3R3T3r9MaWczn37RZsTfTIg7N3ayxJF9w2oNetO5FvPSlRnSMINYLECfucqr8RBvPky0u6qvYiQJesImnzOSDZjNYRAcesGJASN%2FpnM3GWFqy2Et6JBRXAD7bfPflMTE%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eeccf421f5bf83d8dc7dac8a8ba2d84e969b9e84b64189bf8499b5619186f7b1e92af0fea7c3b92a86aea9d4d13998edbedad06b95bdb68fb23d9286bdb5e5608bb9f9afb26bbba886a7bc7df2b18286f745f79abab1d26892b29daecc469b948ba4e57fa1afbed9d14ab690a59ab37ff6afbabaec5b8abbbdaaf066ba919da5d9628e879ea2e26fb19986a2d246edb0a2aeb24d959abf9ab14fb8ea86a3d154839cf983e55ca6b483b5c837e2a3; WM_TID=d5ns34pkpB1BVURUUFZ6abePxvgSIpPn",
        origin: "https://music.163.com",
        "sec-ch-ua": '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(1);
      console.log(data);
    })
    .catch(err => err);
  }


  render() {
    return <div>
      Artist
    </div>
  }
}