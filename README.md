[![crypto_smiles](http://i.imgur.com/Ot5DWAW.png)](https://vimeo.com/258816720)


# crypto-smiles

This a collection of scripts that (run together) set up a physical blockchain pay-for-a-smile interface on ropsten-testnet (the ethereum test-blockchain for developers). 

general prerequisites:

- remote server with https-certificate and domain
- raspberry pi with python 2 and wiringpi installed
  (+ servo)
- webcam
- browser with metamask installed (ethereum wallet as chrome extension), running on ropsten testnet

# run pi and server side


- run on pi: node script reads changes on a specific contract, stores them in db, python script reads changes and triggers servo
  ```
  sudo python pi_servo_crypto.py
  node pi_souls.js
  
  ```
  
- run on remote server: serves webcamstream on port 3000 / index.html and captures webcam stream from port 12344 / index_alt.html
  ```
  node server.js
  node server_alt.js
  ```

- point computer with webcam to servo/smiley face on "yourwebsite.com:12344/index_alt.html"
- access the stream and the metamask payment interface via "yourwebsite.com:3000/index.html", 
  copy wallet address, submit a (fake ethereum) payment on metamask in ropsten-testnet, watch the smiley-face come up in the webcam
