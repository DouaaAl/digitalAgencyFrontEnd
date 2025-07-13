"use client"
import React, {useEffect, useState} from 'react'
import styles from "./update.module.css"
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Url from "./url";
import { useRouter } from "next/navigation";
import ProjectImage from "@/app/components/projectImage/ProjectImage"


const page = () => {

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      async function checkAuth() {
        try {
          const res = await fetch(`${ process.env.NEXT_PUBLIC_API_URL}/profile`, {
            credentials: "include",
          });
  
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            window.location.href = "/";
            setIsAuthenticated(false);
          }
        } catch {
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      }
  
      checkAuth();
    }, []);
  
      const params = useParams();
      const [id, setId] = useState(params?.id);
        const router = useRouter();

      /*********** Items logic ********/
      const [item, setItem] = useState();
      const [updatedItem, setUpdatedItem] = useState({
        "title": "",
        "description": "",
        "imagesUrls": [
            "",
            ""
        ],
        "category": "Design",
        "links": [
            {"Name": "figma files", "url": "https://figma.com/project-redesign"}
        ]
      });
    
      const getItem = async() =>{
        if(id){
          const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)
          const res = await data.json();
          setItem(res);
          setUpdatedItem(res);
          setUploadedUrls(res.imagesUrls)
        }
      }
    
      useEffect(()=>{
        getItem();
      },[id])

    /*********** Image Upload Logic **********/
    const [images, setImages] = useState([]);
    const [uploadedUrls, setUploadedUrls] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
    setImages(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        setUploading(true);
        const uploaded = uploadedUrls;

        for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('file', images[i]);
      formData.append('upload_preset', 'rcn75gnj'); 

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dmifklyqq/image/upload', {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        uploaded.push(data.secure_url);
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    setUploadedUrls(uploaded);
    setUploading(false);
    setUpdatedItem((oldVal)=>{
        return {...oldVal, imagesUrls: uploadedUrls};
    })
  };

  const deleteImage = (index)=>{
    setUploadedUrls((prevUrls) =>
        prevUrls.filter((_, i) => index !== i)
    );
  }

  /************* Links Logic **************/
  const [newLink, setNewLink] = useState({
    "Name": "",
    "url": ""
  })
  const addLink = () =>{
    if(newLink.Name != "" && newLink.url != "" && isNaN(newLink.Name) && isNaN(newLink.url)){

        setUpdatedItem((oldVal)=>{
            return {...oldVal, links:[...oldVal.links, newLink]
            };
        })
    }
  }

  /****************Server Actions **********/
  const updateItemSever = async() =>{
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,  {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(updatedItem)
});
    const res = await data.json();
    setItem(res);
    setUpdatedItem(res);
  }

  const deleteItemServer = async() =>{
    try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,  {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedItem)
        });
        const res = await data.json();
        router.push("/");
    } catch (error) {
        console.log(error);    
    }
  }

    if (loading) return <p>Checking authentication...</p>;
    if (!isAuthenticated) return null;

  return (
    <section className={styles.update}>
        <section className={styles.project}>
            <img className={styles.mainImage} src={item?.imagesUrls[0] || "https://static.vecteezy.com/system/resources/previews/008/255/803/non_2x/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg"} alt="" />
      <h1>{item?.title}</h1>
      <p>{item?.description}</p>
      <h3>Links:</h3>
      <div className={styles.linkDiv}>
      {
        item?.links?.map((link)=>{
          return <a key={link.url} href={link.url}>{link.Name}</a>
        })
      }

      </div>
      <h3>Images</h3>
      <div className={styles.imageFlex}>
        {
            item?.imagesUrls?.map((link, i)=>{
                if(i > 0){
                    return <ProjectImage key={i} link={link} />
                }
            })
        }
      </div>
    </section>
        <form onSubmit={(e)=>e.preventDefault()} action="" className={styles.change}>
            <div>
                <label htmlFor="">Title: </label>
                <input value={updatedItem?.title} onChange={(e)=>{
                    setUpdatedItem((oldVal)=>{
                        return {...oldVal, title:e.target.value};
                    })
                }} className={styles.disappear} placeholder='Title' type="text" />
            </div>
            <div>
                <label htmlFor="">Description</label>
                <textarea value={updatedItem.description} onChange={(e)=>{
                    setUpdatedItem((oldVal)=>{
                        return {...oldVal, description: e.target.value}
                    })
                }} className={styles.disappear} placeholder='Description' name="" id=""></textarea>
            </div>
            <div>
                <label htmlFor="">Links</label>
                {
                    updatedItem?.links.map(((link, index)=>{
                        return <Url
                        index={index}
                        key={link.url} link={link} updatedItem={updatedItem} setUpdatedItem={setUpdatedItem} />
                    }))
                }
                <div className={styles.linkFlex}>
                    <input
                     value={newLink.Name}
                     onChange={(e)=>{
                        setNewLink((oldVal)=>{
                            return {...oldVal, Name: e.target.value}
                        })
                     }}
                    placeholder='link text' type="text" />
                    <input value={newLink.url}
                     onChange={(e)=>{
                        setNewLink((oldVal)=>{
                            return {...oldVal, url: e.target.value}
                        })
                     }} placeholder='url' type="text" />
                    <button onClick={()=> addLink()}>Add</button>
                </div>
            </div>
            <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
      
      >
        {uploading ? "Uploading..." : "Upload to Cloudinary"}
      </button>

      {uploadedUrls.length > 0 && (
        <div >
          <h3>Uploaded Images:</h3>
          <div >
            {uploadedUrls.map((url, index) => (
                <div className={styles.previewImage} key={url}>
                    <img src={url} alt={`uploaded-${index}`}  />
                    <button onClick={()=>deleteImage(index)}>Delete Image</button>
                </div>
            ))}
          </div>
        </div>
      )}
            </div>
            <div className={styles.categoryDiv}>
              <h3>Category: </h3>
              <select value={updatedItem.category} onChange={(e)=>{
                console.log(e.target.value);
                setUpdatedItem((oldVal)=>{
                  return {...oldVal, category: e.target.value}
                })
              }} name="" id="">
              <option value="">All</option>
              <option value="">Web</option>
              <option value="copy">CopyWrite</option>
              <option value="graphic">Graphic Design</option>
              </select>
            </div>
            <button onClick={()=>updateItemSever()}>Update</button>
            <button onClick={()=>deleteItemServer()}>Delete</button>
        </form>
    </section>
  )
}

export default page