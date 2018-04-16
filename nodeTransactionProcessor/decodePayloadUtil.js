const crypto = require('crypto')
const decipher = crypto.createDecipher('sha512','')

let decrypted = '';
decipher.on('readable', () => {
  const data = decipher.read();
  if (data)
    decrypted += data.toString('utf8');
});

decipher.on('end', () => {
  console.log(decrypted);
  // Prints: some clear text data
});

const encrypted = '17e6cb460283ad8d720c5f07ca7b85fdd721312c27f2effbe2ad7beaa5577497b530597803625d31f2cb1dbe436e9c8e3a870012edc1460b5e0b53e0668d070d';
decipher.write(encrypted, 'hex');
decipher.end();
