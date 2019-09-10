 <h1> :rocket: Google Summer Of Code 2019 </h1>
 <h2> Development of a Thesis Management System (TMS) </h2>


<h2> Problem Statement </h2>
 The process of thesis writing can play a significant role to a student’s life. So much consideration is required during this process, from the topic selection to final submission. Hard work, proper research and writing skills are obligatory for a successful outcome. The existing bureaucracy adds more complexity to thesis procedure, since thesis topics are not gathered in a specific website. Therefore each student have to contact every professor separately to learn his available thesis or in best case to visit professor’s website if he has uploaded them there. Moreover, every professor has many thesis topics assigned to supervised students and the tracking of their progress is difficult.

<h2> Abstract </h2>
 I propose the development of a web application that will support the whole lifecycle of a thesis, namely, a Thesis Management System (TMS) that will benefit the students as well as the professors. This proposed system aims at eliminating the time consuming procedures and paper work of a thesis in the universities ,by encapsulating and automating them in the web app. Moreover TMS will provide the functionality of an open source digital repository of completed theses, where the student authors can share their work to a wide audience and may be cited more easily by companies and researchers in their academic community.
 

<h2> Demo </h2>

You can find a demo here http://83.212.104.202:4200. <br>
Test users with SSO: 

  1. Professor
  - email: professor@gmail.com
  - password: 8nhUv97uQL6
  
  2. Student 
  - email: frontendstudent@gmail.com
  - password: 7uQL6&+R4-
            

<h2> Lifecycle </h2>

The lifecycle of TMS can be separated in 4 periods:

- Topics proposals period
- Application-Selection period
- Working on a thesis period
- Complete of thesis period
 
You can find a more detailed review in [Wiki Lifecycle](https://github.com/eellak/gsoc2019-tms/wiki/Lifecycle-of-TMS)

 <h2> Wiki Overview </h2>
 
 - [Installation Guide](https://github.com/eellak/gsoc2019-tms/wiki/Installation-Guide)
 - [Architecture Design](https://github.com/eellak/gsoc2019-tms/wiki/Architecture-Design)
 - [API Documentation](https://github.com/eellak/gsoc2019-tms/wiki/API-Documentation)
 - [SSO Documentation](https://github.com/eellak/gsoc2019-tms/wiki/Single-Sign-On-Documentation)
 - [Register-Login](https://github.com/eellak/gsoc2019-tms/wiki/Register-and-Login-as-External-user)
 - [TMS Lifecycle](https://github.com/eellak/gsoc2019-tms/wiki/Lifecycle-of-TMS)
 -[Wiki Contribute](https://github.com/eellak/gsoc2019-tms/wiki/Contribute-and-Future-Work)

 
<h2> Final Report Gist </h2>

 Link to the final report (https://gist.github.com/MichailChatzianastasis/1768fcfcc72ad735bc42ab8456fd16d0) 

<h2> Contributors </h2>
 
 - Google Summer of Code participant: [Michail Chatzianastasis](https://github.com/MichailChatzianastasis)
 - Mentor: [Theodoros Karounos](https://github.com/tgkarounos)
 - Mentor: [Iraklis Varlamis](https://github.com/varlamis)
 - Mentor: [Georgia Kapitsaki](https://github.com/gkapi)
 - Organization: [GFOSS](https://gfoss.eu/)
 
 
 <h2> Technologies used </h2>
 
The data are stored in MongoDB (document-oriented database schema) and is accessible through a RESTful API.

The <b>backend</b> is written in node js, using the following libraries: [bcrypt](https://www.npmjs.com/package/bcrypt) , [body-parser](https://www.npmjs.com/package/body-parser) , [dotenv](https://www.npmjs.com/package/dotenv) , [express](https://www.npmjs.com/package/express) ,
 [form-data](https://www.npmjs.com/package/form-data) ,[formidable](https://www.npmjs.com/package/formidable),[lodash](https://www.npmjs.com/package/lodash) , [multer](https://www.npmjs.com/package/multer) , [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongodb](https://www.npmjs.com/package/mongodb) , [mongoose](https://www.npmjs.com/package/mongoose) , [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) , [morgan](https://www.npmjs.com/package/morgan) , [passport](https://www.npmjs.com/package/passport) , [passport-saml](https://www.npmjs.com/package/passport-saml), [querystringify](https://www.npmjs.com/package/querystringify)

The <b>frontend</b> is written in angular7, using the following modules: [@angular/core](https://www.npmjs.com/package/@angular/core) , [@angular/common](https://www.npmjs.com/package/@angular/common) , [@angular/compiler](https://www.npmjs.com/package/@angular/compiler) , [@angular/compiler-cli](https://www.npmjs.com/package/@angular/compiler-cli) , [@angular/forms](https://www.npmjs.com/package/@angular/forms) , [@angular/http](https://www.npmjs.com/package/@angular/http) , [@angular/platform-browser](https://angular.io/api/platform-browser) , , [@angular/platform-browser-dynamic](https://www.npmjs.com/package/@angular/platform-browser-dynamic)  , [@angular/platform-server](https://www.npmjs.com/package/@angular/platform-server) , [@angular/router](https://www.npmjs.com/package/@angular/router) , [@angular/animations](https://www.npmjs.com/package/@angular/animations) , [@angular/upgrade](https://www.npmjs.com/package/@angular/upgrade) , [@angular/material](https://www.npmjs.com/package/@angular/material) , [rxjs](https://www.npmjs.com/package/rxjs) , [tslib](https://www.npmjs.com/package/tslib) , [zone.js](https://www.npmjs.com/package/zone.js?activeTab=readme) , [bootstrap@3](https://www.npmjs.com/package/bootstrap) , [@ng-bootstrap/ng-bootstrap](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap)

For the UI css <b>bootstrap3</b> framework is used
    
    
<h2> Future Work </h2>

- Improvements in User Interface , e.g. in the data-tables.
- SSO Integration with universities Identity Providers, e.g. Ntua Identity Provider

For more details you can visit [Wiki Contribute](https://github.com/eellak/gsoc2019-tms/wiki/Contribute-and-Future-Work)


<h2> License </h2> 
The project is opensourced as a part of the Google Summer of Code Program. Here, the MIT license is adopted. For more information see LICENSE.



