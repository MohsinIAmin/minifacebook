import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

const URL = 'http://localhost:3000/story';

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
  imgSrcs: any = ['../../../../assets/face.jpg',
    '../../../../assets/face.jpg', '../../../../assets/face.jpg', '../../../../assets/face.jpg'
    , '../../../../assets/face.jpg', '../../../../assets/face.jpg', '../../../../assets/face.jpg'
    , '../../../../assets/face.jpg', '../../../../assets/face.jpg', '../../../../assets/face.jpg'];



  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
    additionalParameter: {
      uid: this.getUserId()
    }
  });
  constructor(private _auth: AuthService, private _api: ApiService, private _router: Router) { }

  ngOnInit(): void {
    this.getStatus();
    this.getStory();

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = () => { };

    this.uploader.onSuccessItem = () => { };

  }

  onUpload() {
    this.uploader.uploadAll();
  }

  getUserId() {
    const userdata = JSON.parse(this._auth.getUserDetails() + '');
    const uid = userdata.email;
    return uid;
  }
  getStatus() {
    const uid = this.getUserId();
    this._api.getTypeRequest(`status/${uid}`).subscribe((res: any) => {
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
    this._api.getTypeRequest(`story/file/${this.miniStory[0].filename}`).subscribe((res: any) => {
      console.log(res);
    });
  }
  getStory() {
    const uid = this.getUserId();
    this._api.getTypeRequest(`story/${uid}`).subscribe((res: any) => {
      const status = res.status;
      if (status == 200) {
        this.miniStory = res.data;
        for (const iterator of this.miniStory) {
          iterator.imgSrc = "https://localhost:9000/minifacebook/"+iterator.filename;
        }
        this.getImage();
      } else {
        this._auth.clearStorage();
        this._router.navigate(['login']);
      }
    });
  }

  postStatus() {
    const userdata = JSON.parse(this._auth.getUserDetails() + '');
    const uid = this.getUserId();
    this._api.postTypeRequest('status', { uid, status: this.postStr }).subscribe((res: any) => {
      const status = res.status;
      if (status == 201) {
        this.getStatus();
        this.postStr = '';
      }
    });
  }

}
