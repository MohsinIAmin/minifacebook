import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

const URLstory = environment.baseUrl + 'story';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  imgName: string = 'Select';
  postStr: string = '';
  miniStatus: any = [];
  miniStory: any = [];

  public uploader: FileUploader = new FileUploader({
    url: URLstory,
    itemAlias: 'image',
    authToken: this._auth.getToken() + '',
  });
  constructor(private _auth: AuthService,
    private _api: ApiService,
    private _router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getStatus();
    this.getStory();

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  }

  onUpload() {
    this.uploader.uploadAll();
  }

  getStatus() {
    this._api.getTypeRequest('status').subscribe((res: any) => {
      const status = res.status;
      if (status == 200) {
        this.miniStatus = res.data;
      } else {
        this._auth.clearStorage();
        this._router.navigate(['login']);
      }
    });
  }

  getImage() {
    for (let i = 0; i < this.miniStory.length; i++) {
      this._api.getTypeRequestReturnBlob(`story/file/${this.miniStory[i].filename}`).subscribe((res: any) => {
        this.miniStory[i].imgUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res.body));
      });
    }
  }
  
  getStory() {
    this._api.getTypeRequest('story').subscribe((res: any) => {
      const status = res.status;
      if (status == 200) {
        this.miniStory = res.data;
        this.getImage();
      } else {
        this._auth.clearStorage();
        this._router.navigate(['login']);
      }
    });
  }

  postStatus() {
    this._api.postTypeRequest('status', { status: this.postStr }).subscribe((res: any) => {
      const status = res.status;
      if (status == 201) {
        this.getStatus();
        this.postStr = '';
      }
    });
  }

}
