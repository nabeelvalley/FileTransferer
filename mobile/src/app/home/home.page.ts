import { Component, OnInit } from '@angular/core';
import * as Mqtt from '../lib/browserMqtt'
import * as mqtt from 'mqtt'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  client: mqtt.MqttClient

  constructor() {
    this.client = Mqtt.connect('ws://192.168.0.113:1884')
    this.client.on('connect', () => {
      console.log('connected to ws')
    })

    this.client.on('error', (err) => {
      console.log(err)
    })
  }

  ngOnInit() { }

  sendMessage(topic: string, message: string): void {
    this.client.publish(topic, message)
  }
}
