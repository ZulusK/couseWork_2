# 0. Errors
* If your request is bad, you will get next
 ### response:

``````
{
    success:false,
    message:String
}
``````
# 1. Auth
* # **Login** 
`post(/api/v1/auth/login)`

### request:
``````
{
    email:String, 
    password:String
}
``````
### response: 
``````
{
    success:true,
    tokens:
        [
            access:String,
            refresh:String
        ],
    user:
        {
            fullname:String,
            email:String,
            telegram:String,
            id:String
        }     
}
``````
* # **Register**
 `post(/api/v1/auth/register)`

### request:
``````
{
    email:String,
    password:String,
    fullname:String,
    telegram{optional}:String
}    
``````
### response:
``````
{
    success:true,
    tokens:
        [
            access:String,
            refresh:String
        ],
    user:
    {
        fullname:String,
        email:String,
        telegram:String,
        id:String
    }    
}
``````
* # **Logout**
 `post(/api/v1/auth/logout)`

### request:
``````
{
    {SEND BEARER AUTHORIZATION HEADER}
}    
``````
### response:
``````
{
    success:true,
}
``````
* # **Get new access token**
 `post(/api/v1/auth/token)`

### request:
``````
{
    {SEND BEARER AUTHORIZATION HEADER}
}    
``````
### response:
``````
{
    success:true,
    tokens:String
}
``````
## 2. Publications
* # **Search**
 `get(/api/v1/publications)`
 
 request (use URL-encoded request):
 ``````
 page:Number(>0)    (optinal)
 limit:Number(>0)   (optinal)
 title:String       (optinal)
 author:String      (optinal)
 tags:["String"]    (optinal)
 id:String          (optinal)
 ``````
 ### response:
 ``````
 {
     success:true,
     query:String [computed search query],
     page: Number,
     total: Number,
     limit: Number,
     pager: Number,
     items:
     [
         {
             title: String,
             author_id: String,
             image_id: String,
             text: String,
             description: String,
             id: String,
             createdAt: String,
             tags: [String],
             difficult: Number            
         }
     ]
 }
 ``````
 * # **Delete**
  `delete(/api/v1/publications)`
  
  ### request:
  ``````
 {
    id:String
 }
  ``````
  ### response:
   ``````
   {
      success:true,
      query:String [computed search query],
      publication:
      {
            title: String,
            author_id: String,
            image_id: String,
            text: String,
            description: String,
            id: String,
            createdAt: String,
            tags: [String],
            difficult: Number            
       }
   }
``````
* # **Update**
 `put(/api/v1/publications)`
  
### request:
``````
 {
    target:String,
    title:String,
    description:String,
    text:String,
    difficult:Number,
    add_tags:[String] [list of new tags],
    remvoe_tags:[String] [list of tags to remove]
    image_id:String 
 }
 ``````
### response:
``````
eq. Publication.delete
``````
* # **Create**
 `post(/api/v1/publications)`
  
### request:
``````
 {
    title:String,
    description:String,
    text:String,
    difficult:Number,
    tags:[String],
    image_id:String 
 }
 ``````
### response:
``````
{
    success:true,
    publication:
    {
        title: String,
        author_id: String,
        image_id: String,
        text: String,
        description: String,
        id: String,
        createdAt: String,
        tags: [String],
        difficult: Number   
    }
}
``````
## 2. Users
* # **Search**
 `get(/api/v1/users)`
 
 request (use URL-encoded request):
 ``````
 page:Number(>0)            (optinal)
 limit:Number(>0)           (optinal)
 fullname:String            (optinal)
 email:String               (optinal)
 publications:["String"]    (optinal)
 id:String                  (optinal)
 isAdmin:Boolean            (optinal)
 telegram:String            (optinal)
 ``````
 ### response:
 ``````
 {
     success:true,
     query:String [computed search query],
     page: Number,
     total: Number,
     limit: Number,
     pager: Number,
     items:
     [
         {
             fullname: String,
             telegram: String,
             email: String,
             isAdmun: Boolean,
             publicaitons: [String],
             id: String       
         }
     ]
 }
 ``````
 * # **Delete**
  `delete(/api/v1/users)`
  
  ### request:
  ``````
 {
    id:String
 }
  ``````
  ### response:
   ``````
   {
      success:true,
      query:String [computed search query],
      user:
      {
           fullname: String,
           telegram: String,
           email: String,
           isAdmun: Boolean,
           publicaitons: [String],
           id: String              
       }
   }
`````` 
* # **Update**
 `put(/api/v1/users)`
  
### request:
``````
 {
    target:String,
    fullname:String            (optinal)
    email:String               (optinal
    password:String            (optional)
    id:String                  (optinal)
    isAdmin:Boolean            (optinal)
    telegram:String            (optinal)
 }
 ``````
### response:
``````
eq. Users.delete
``````
## 3. Resources
* # **Get**
 `get(/api/v1/res)`
 
 request (use URL-encoded request):
 ``````
 id:String
 ``````
 response:
 ``````
 file-data
 ``````
* # **Delete**
`delete(/api/v1/res)`
  
  ### request:
``````
 {
    id:String
 }
``````
  ### response:
``````
   {
      success:true,
      id: String
   }
``````  
* # **Create** 
`post(/api/v1/res)`
  
### request:
``````
[use form-data header]
 {
    file:File
 }
 ``````
### response:
``````
{
    success:true,
    id:String
}
`````` 