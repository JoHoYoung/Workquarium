import { toPromise } from '../../util/utils';
import redis from '../../lib/redis';
import { chatLogKey } from '../../message/format/chat';
import config from "../../config";

const express = require('express');

const router = express.Router();

/* GET users listing. */
router.post('/get', async (req, res) => {
  const roomId = req.body.roomId;
  let logs = await redis.lrange(`${roomId}_log`);

  if(logs.length > 0){
    let output = "";
    logs = logs.map((el) => JSON.parse(el)).filter((data) => data.type === config.TYPE.CHAT);
    for(let i=0;i<logs.length;i++){
      let json = JSON.parse(logs[i]);
      output += `${json.userName}|${json.msg}|${json.createdAt}\n`
    }
    res.setHeader('Content-type', "application/octet-stream");
    res.setHeader('Content-disposition', 'attachment; filename=log.txt');
    res.send(output);
    res.end();
  }else{
    res.write("NONE");
    res.end();
  }
});


module.exports = router;
