'use strict';
var parseString = require('xml2js').parseString;
var iconv = require('iconv-lite');


const url = 'http://www.tcmb.gov.tr/kurlar/today.xml';

const getParseRequest = async (data) => {
    let returnObject = {
        success:false,
        messsage:'Unknown Error',
        currenyData:[],
        providerDate:null
    }
    let xml = iconv.decode(data, 'UTF-8');
    if (!xml || xml.search('Tarih_Date') === -1) {
        returnObject['message'] = 'Invalid xml';
        return returnObject;
    }

    try{
        let parsedResult = await parseXmlToString(data);
        return parsedResult;
    } catch(error){
        returnObject['message'] = 'Xml parse error!';
        return  returnObject
    }



};

const parseXmlToString = (xml) => {
    return new Promise((resolve, reject) => {
        parseString(xml, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let editResult = editCurrencyResult(result);
                resolve(editResult);
            }
        });
    });
}

const editCurrencyResult = (data) => {
    let result = data.Tarih_Date.Currency.map(curr => ({ text: curr.$.Kod + 'TRY', value:curr.ForexBuying[0] }));
    return {success:true,message:'Success parse operation',currenyData:result,providerDate:data.Tarih_Date.$.Date + ' | Bulten_No: ' + data.Tarih_Date.$.Bulten_No};
    console.log(result);
}

module.exports = {
    requestURL:url,
    getParseRequest:getParseRequest
}