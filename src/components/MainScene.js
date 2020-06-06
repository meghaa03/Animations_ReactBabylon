import React, { Component } from 'react'
import { Engine, Model, Scene, ArcRotateCamera, HemisphericLight, EnvironmentHelper } from 'react-babylonjs';
import { Vector3, SceneLoader} from '@babylonjs/core';
import Footer from './Footer';

var renderedScene;
var renderedModel;
export class MainScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            id: "before",
            model: ""
        }
        this.loadModel.bind(this);
    }

    onSceneMounted = (args) => {
        renderedScene = args.scene;
    }

    startAnimation = () => {
        if (renderedModel) {
            renderedModel.animationGroups[0].play();
        }
    }

    stopAnimation = () => {
        if (renderedModel) {
            renderedModel.animationGroups[0].stop();
            //sceneToRender.stopAllAnimations();            
        }
    }

    playAnimation = () => {        
        
        SceneLoader.ImportAnimations("", "url to my animation gltf file", renderedScene, true, 0, null, (scene) => {
            console.log("imported", scene.animationGroups);
            if (scene.animationGroups.length > 0) {
                console.log(scene.animationGroups[0].name);
                scene.animationGroups[0].play(true);
                console.log(scene.animationGroups[0].name);
            }
        });
    }

    renderModel = (rootURL) => {
        console.log("renderModel");
        this.setState({
            ...this.state,
            url: rootURL,
            id: "after"
        })
    }

    fetchModel = (loadModel) => {

        var url="url to my model";

        var binaryString = "";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (((xhr.status === 200) || (xhr.status == 0)) && (xhr.response)) {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        binaryString = reader.result;
                        binaryString = binaryString.replace("application/octet-stream;", "");
                        //console.log(binaryString);
                        loadModel(binaryString);
                    }
                    reader.readAsDataURL(xhr.response);
                }
            }
        }

        xhr.send(null);
    }

    loadModel = (base64_model_content) => {

        var raw_content = this._base64ToArrayBuffer(base64_model_content.replace("data:base64,", ""));
        var blob = new Blob([raw_content]);
        var url = URL.createObjectURL(blob);
        console.log(url);

        this.renderModel(url);

    }

    _base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        //console.log(base64)
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    render() {
        //console.log("render", this.state.url)
        return (
            <React.Fragment>
                <div className="mainScene">
                    <button onClick={() => this.fetchModel(this.loadModel)}>Click</button>
                    <button onClick={() => this.playAnimation()}>Play</button>
                    <button onClick={() => this.startAnimation()}>Start Animation</button>
                    <button onClick={() => this.stopAnimation()}>Stop Animation</button>
                    <Engine antialias adaptToDeviceRatio canvasId="sample-canvas">
                        <Scene canvasId="scene_1" onSceneMount={this.onSceneMounted}>
                            {/* <ArcRotateCamera name="arc" target={new Vector3(0, 1, 0)} minZ={0.001}
                                alpha={-Math.PI / 2} beta={(0.5 + (Math.PI / 4))} radius={5} lowerRadiusLimit={5} upperRadiusLimit={10} /> */}
                            <ArcRotateCamera name="camera1" alpha={Math.PI / 2} beta={Math.PI / 2} radius={10.0} target={Vector3.Zero()} minZ={0.001} />
                            <HemisphericLight name='hemi' direction={new Vector3(0, 0, 0)} intensity={0.8} />
                            <Model
                                rotation={new Vector3(0, -15, 0)} key={this.state.id} position={new Vector3(0, 0, 0)}
                                rootUrl={this.state.url} sceneFilename="" pluginExtension=".gltf"
                                scaling={new Vector3(1, 1, 1)} onModelLoaded={(model) => {
                                    console.log('model:', model)
                                    renderedModel = model;
                                    console.log("rendered ", renderedModel);
                                }} onModelError={(error) => console.error('error:', error)} />
                            {/* <EnvironmentHelper options={{ enableGroundShadow: true, groundYBias: 1 }} mainColor={Color3.FromHexString("#74b9ff")} /> */}
                        </Scene>
                    </Engine>
                </div>
                <div className="footer"><Footer renderModel={this.renderModel} /></div>
            </React.Fragment>
        )
    }
}

export default MainScene
