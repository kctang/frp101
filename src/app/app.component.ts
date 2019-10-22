import {Component, OnInit} from '@angular/core'
import {main} from './demo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frp101'

  async ngOnInit() {
    const now = new Date()
    console.log(`> Demo Run - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
    await main()
  }
}
