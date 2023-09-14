import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import http from 'util/http';

// INVALID VALID PENDING FAILED

// "phoneCode": null,
//             "state": null,

export const ComplyCubeVerification = () => {
    const user = useSelector((state: any) => state.auth.user);
    const [complyCubeToken, setComplyCubeToken] = useState('')

    const idVerification = user.verifications.find((method: { type: string; }) => method.type === "IDENTITY")
    const invalidIdVerification = idVerification && (idVerification.status === 'PENDING')

    const documentVerification = user.verifications.find((method: { type: string; }) => method.type === "DOCUMENT")
    const invalidDocumentVerification = documentVerification && (documentVerification.status === 'PENDING')

    const verificatiionCompleted = !invalidIdVerification && !invalidDocumentVerification

    const stages: any =[
    {
        name: "intro",
        options: {
        heading: "SB Remit identity verification",
        message: [
            "Only UK Government issues Document Accepted",
            "UK Passport, UK Drivers License, UK Biometrics resident permit (BRP)",
        ],
        startButtonText: "Verify your UK identity"
        },
    },
    "userConsentCapture",
    ]

    if(invalidIdVerification){
        stages.push({
            name: 'faceCapture',
            options: {
                mode: 'video'
            }
        })
    }
    if(invalidDocumentVerification){
        stages.push({
            name: "documentCapture",
            options: {
                documentTypes: {
                passport: {country: "GB"},
                driving_license: {country: "GB"},
                national_identity_card: {country: "GB"},
                residence_permit: {country: "GB"},
                },
            },
        })
    }

    useEffect(() => {
        if(!verificatiionCompleted){
            // fetch Token /verification-token-experience
            http.get('/verification-token-experience') // data.token
            .then(res => {
                if(res.data.status === '200'){
                    setComplyCubeToken(res.data.data.token)
                }
            })
            .catch(error => console.log("complycube error"))
        }
    }, [])

    const openComplyCube = () => {
        const newWindow: any = window;
        const complycube = newWindow?.ComplyCube.mount({
            token: complyCubeToken,
            stages,
            onComplete: function(data: any) {
                // console.log("Capture complete", data)
                if(data?.documentCapture){
                    http.put('/verification-token-experience',{
                        verficationId: documentVerification.id,
                        verificationData: data?.documentCapture
                    })
                    .then(() => {})
                    .catch(() => {})
                }
                if(data?.faceCapture){
                    http.put('/verification-token-experience',{
                        verficationId: idVerification.id,
                        verificationData: data?.faceCapture
                    })
                    .then(() => {})
                    .catch(() => {})
                }
                /**
                 {
                    documentCapture: {documentId: '6501d77d9f98560008d03834', documentType: 'driving_license'}
                    faceCapture: {liveVideoId: "6501d7539f98560008d03812"}
                }
                */
            },
            onError: (err: any) => console.log("complycube-error", err),
            onModalClose: () => complycube.updateSettings({ isModalOpen: false })
        })
    }


    if(verificatiionCompleted){
        return <p>Identity & Document verification Completed</p>
    }

    if(!complyCubeToken){
        return null
    }

    return (
        <>
            <div id="complycube-mount"></div>
            <button onClick={openComplyCube}>
                Open ComplyCube
            </button>
        </>
    )
}
