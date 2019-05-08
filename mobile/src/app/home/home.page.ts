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
    // private networkInterface: NetworkInterface
  ) {
    this.client = mqtt.connect('ws://192.168.0.113:1884')
    // this.networkInterface.getWiFiIPAddress().then((ip) => {
    //   this.wifiIpAddress = ip;
    // })
  }

  ngOnInit() {
    this.client.on('connect', () => {
      console.log('connected to ws');
    })

    this.client.on('error', (err) => {
      console.log(err);
    })
  }

  sendMessage(topic: string, data: Buffer): void {
    this.client.publish(topic, data);
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
        this.sendMessage('file-transfer', buffer)
      };

    })
  }
}