import { Injectable } from '@nestjs/common';
import { spawn, exec } from 'child_process';

@Injectable()
export class AppService {
  start(url: string, browser: string): void {
    spawn(this.getBrowserApp(browser), [url]);
  }

  stop(browser: string): void {
    exec(`${this.getOSIndependentCmd('kill')} ${this.getBrowserApp(browser)}`);
  }

  cleanup(browser: string): void {
    exec(`${this.getOSIndependentCmd('rm')} ${this.getBrowserStoragePath(browser)}`);
  }

  // async geturl(browser: string): string {
  //   const data = await exec('~/lz4jsoncat ~/.mozilla/firefox/h3n7l8of.default-release/sessionstore-backups/recovery.jsonlz4');

  //   console.log(data)
  // }

  private getBrowserApp = (browser: string): string => browser === 'firefox' ? browser : 'google-chrome-stable';

  private getBrowserStoragePath(browser: string) {
    let cmd = '~/.config/google-chrome/Default';
    if (browser === 'firefox') {
      cmd = '~/.mozilla/firefox/*';
    }

    return cmd;
  }

  private getOSIndependentCmd(cmd: string): string {
    const commands = {
      'linux': {
        'kill': 'pkill -9',
        'rm': 'rm -r'
      },
      'windows': {
        'kill': 'taskkill /im',
        'rm': 'rm -r'
      }
    };

    return commands[process.platform][cmd];
  }
}
