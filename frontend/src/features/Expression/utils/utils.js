// import {
//     FaceLandmarker,
//     FilesetResolver
// } from "@mediapipe/tasks-vision";


// export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
//     const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//     );

//     landmarkerRef.current = await FaceLandmarker.createFromOptions(
//         vision,
//         {
//             baseOptions: {
//                 modelAssetPath:
//                     "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
//             },
//             outputFaceBlendshapes: true,
//             runningMode: "VIDEO",
//             numFaces: 1
//         }
//     );

//     streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = streamRef.current;
//     await videoRef.current.play();
// };

// export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
//     if (!landmarkerRef.current || !videoRef.current) return;

//     const results = landmarkerRef.current.detectForVideo(
//         videoRef.current,
//         performance.now()
//     );

//     if (results.faceBlendshapes?.length > 0) {
//         const blendshapes = results.faceBlendshapes[ 0 ].categories;

//         const getScore = (name) =>
//             blendshapes.find((b) => b.categoryName === name)?.score || 0;

//         const smileLeft = getScore("mouthSmileLeft");
//         const smileRight = getScore("mouthSmileRight");
//         const jawOpen = getScore("jawOpen");
//         const browUp = getScore("browInnerUp");
//         const frownLeft = getScore("mouthFrownLeft");
//         const frownRight = getScore("mouthFrownRight");

//         console.log(getScore("mouthFrownLeft"))

//         let currentExpression = "Neutral";

//         if (smileLeft > 0.5 && smileRight > 0.5) {
//             currentExpression = "happy";
//         } else if (jawOpen > 0.2 && browUp > 0.2) {
//             currentExpression = "surprised";
//         } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
//             currentExpression = "sad";
//         }

//         setExpression(currentExpression);

//         return currentExpression
//     }
// };

import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    try {
        // 1. Check browser support and secure context
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error("getUserMedia is not supported or origin is insecure (requires localhost or HTTPS).");
        }

        // 2. Request camera access first
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: "user"
            },
            audio: false
        });

        streamRef.current = stream;

        // 3. Attach stream to video and wait for metadata
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.setAttribute("playsinline", "true");
            videoRef.current.muted = true;

            await new Promise((resolve) => {
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().then(resolve);
                };
            });
        }

        // 4. Load MediaPipe vision tasks & model
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        landmarkerRef.current = await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
                },
                outputFaceBlendshapes: true,
                runningMode: "VIDEO",
                numFaces: 1
            }
        );
    } catch (error) {
        console.error("Camera or MediaPipe initialization failed:", error);
    }
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;

    // Ensure video is actively playing frames before passing to detectForVideo
    if (!landmarker || !video || video.readyState < 2) return;

    const results = landmarker.detectForVideo(video, performance.now());

    if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;
        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        let currentExpression = "Neutral";

        if (smileLeft > 0.5 && smileRight > 0.5) {
            currentExpression = "happy";
        } else if (jawOpen > 0.2 && browUp > 0.2) {
            currentExpression = "surprised";
        } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
            currentExpression = "sad";
        }

        setExpression(currentExpression);
        return currentExpression;
    }
};