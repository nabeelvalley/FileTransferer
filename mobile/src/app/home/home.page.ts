import { Component, OnInit } from '@angular/core';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import * as mqtt from '../lib/browserMqtt'
import * as mqttTypes from 'mqtt'
// import * as Buffer from '../lib/browserBuffer'
import { Buffer } from 'buffer'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  client: mqttTypes.MqttClient;
  wifiIpAddress: string;

  constructor(
    private networkInterface: NetworkInterface
  ) {
    this.networkInterface.getWiFiIPAddress()
      .then((ip) => {
        console.log(ip)
        this.wifiIpAddress = ip.ip
      })
  }

  ngOnInit() {
    this.client.on('connect', () => {
      console.log('connected to ws');
    })

    this.client.on('error', (err) => {
      console.log(err);
    })
  }

  connectToBroker(ip: string) {
    this.client = mqtt.connect('ws://192.168.0.113:1884')
  }

  // sendMessage(topic: string, data: Buffer): void {
  //   this.client.publish(topic, data);
  // }

  sendMessage(topic: string, message: any): void {
    const messageString = JSON.stringify(message)
    this.client.publish(topic, Buffer.from(messageString));
  }

  handleFileSelect(event: any) {
    var files = Array.from(event.target.files);

    files.forEach((file: any) => {
      console.log(file)
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e: any) => {
        // The file's text will be printed here
        const data = e.target.result;
        console.log(data);
        var buffer = Buffer.from(data)

        const message = { name: file.name, data: buffer, encoding: 'buffer' }
        this.sendMessage('file-transfer', message)
      };

    })
  }
}