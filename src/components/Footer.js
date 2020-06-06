import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { BlobServiceClient } from '@azure/storage-blob'
// const { BlobServiceClient } = require("@azure/storage-blob");
// import './Footer.css';

export class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            preview: ""
        }
    }

    filePreview = () => {
        this.inputElement.click();
    }


    fileChange = (event) => {
        console.log(event.target.files[0]);
        let selectedFile = event.target.files[0];
        let blobSasUrl = "https://webconfigurator.blob.core.windows.net/?sv=2019-10-10&ss=b&srt=c&sp=rwdlacx&se=2020-05-25T22:04:47Z&st=2020-05-25T14:04:47Z&spr=https&sig=%2Bo1ePZz2%2F0hBL1UIrr2WJvNP0ytVx%2BFCHGGk42zhw6s%3D";
        // Create a new BlobServiceClient
        let blobServiceClient = new BlobServiceClient(blobSasUrl);

        // Create a unique name for the container by 
        // appending the current time to the file name
        let containerName = "model-storage";

        // Get a container client from the BlobServiceClient
        const containerClient = blobServiceClient.getContainerClient(containerName);
     
            // reportStatus("Uploading files...");
            const promises = [];
            // for (const file of fileInput.files) {
                const blockBlobClient = containerClient.getBlockBlobClient(selectedFile.name);
                promises.push(blockBlobClient.uploadBrowserData(selectedFile));
            // }
             Promise.all(promises).then(result=>{
                 console.log("Successful")
             }).catch(err=>{
                 console.log("Fail");
             });
            // reportStatus("Done.");
            // listFiles();
      

        // const reader = new FileReader();
        // if (selectedFile) {
        //     reader.readAsDataURL(selectedFile);
        // }
        // reader.addEventListener("load", () => {
        //     this.setState({
        //         preview: reader.result
        //     },()=>{
        //         this.props.renderModel(this.state.preview)
        //     })
        // });
        // const AZURE_STORAGE_CONNECTION_STRING = "BlobEndpoint=https://webconfigurator.blob.core.windows.net/;QueueEndpoint=https://webconfigurator.queue.core.windows.net/;FileEndpoint=https://webconfigurator.file.core.windows.net/;TableEndpoint=https://webconfigurator.table.core.windows.net/;SharedAccessSignature=sv=2019-10-10&ss=b&srt=c&sp=rwdlacx&se=2020-05-25T22:04:47Z&st=2020-05-25T14:04:47Z&spr=https&sig=%2Bo1ePZz2%2F0hBL1UIrr2WJvNP0ytVx%2BFCHGGk42zhw6s%3D";
        // const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

        // let accountName = "webconfigurator";
        // let sasString = "?sv=2019-10-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-07-10T18:47:47Z&st=2020-05-25T10:47:47Z&spr=https&sig=x00jQygtfZFhZV6mJ7O%2B4qdEYRTroav7%2FbtiJZfeyHE%3D";
        // let containerName = "model-storage";
        // let containerURL = new azblob.ContainerURL(
        //     `https://${accountName}.blob.core.windows.net/${containerName}?${sasString}`,
        //     azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));
        // try {
        //     // reportStatus("Uploading files...");
        //     const promises = [];
        //     // for (const file of fileInput.files) {
        //     const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(containerURL, selectedFile.name);
        //     promises.push(azblob.uploadBrowserDataToBlockBlob(
        //         azblob.Aborter.none, selectedFile, blockBlobURL));
        //     // }
        //     Promise.all(promises).then(result => {
        //         console.log("done");
        //         console.log(result)
        //     }).catch(err => console.log(err));
        //     // reportStatus("Done.");
        //     // listFiles();
        // } catch (error) {
        //     // reportStatus(error.body.message);
        // }
    }

    render() {
        return (
            <React.Fragment>
                <Button variant="outline-light" id="select-button" onClick={this.filePreview}>Upload</Button>
                <input type="file" id="file-input" ref={input => this.inputElement = input} className="file" onChange={this.fileChange} />
            </React.Fragment>
        )
    }
}

export default Footer
