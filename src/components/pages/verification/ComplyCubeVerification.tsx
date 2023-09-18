import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { refreshUserDetails, toastAction } from 'redux/actions/actions';
import http from 'util/http';

// INVALID VALID PENDING FAILED ATTEMPTED

// "phoneCode": null,
//             "state": null,

export const ComplyCubeVerification = () => {
    const user = useSelector((state: any) => state.auth.user);
    const [complyCubeToken, setComplyCubeToken] = useState('')

    const isFormVerified = Boolean(user?.meta?.verified) && user?.meta?.verified !== "retry"

    const location_country = user?.profile?.location_country
    const userCountry = location_country === "GB" ? "UK" : location_country

    let verificationList = []

    if(user?.verifications){
        for (const key in user.verifications){
            verificationList.push(user.verifications[key])
        }
    }

    console.log(verificationList)

    const idVerification = verificationList?.find((method: { type: string; }) => method.type === "IDENTITY")
    const invalidIdVerification = idVerification && (idVerification.status === 'PENDING')

    const documentVerification = verificationList?.find((method: { type: string; }) => method.type === "DOCUMENT")
    const invalidDocumentVerification = documentVerification && (documentVerification.status === 'PENDING')

    const verificationCompleted = !invalidIdVerification && !invalidDocumentVerification

    const stages: any =[
    {
        name: "intro",
        options: {
        heading: "SB Remit identity verification",
        message: [
            `Only ${userCountry} Government issued documents are accepted.`,
            `Passport or Drivers License or Residence Permit or National Identity Card`
        ],
        startButtonText: `Verify your ${userCountry} identity`
        },
    },
    "userConsentCapture",
    ]

    if(invalidIdVerification){
        stages.push({
            name: 'faceCapture',
            options: {
                mode: 'photo'
            }
        })
    }


    if(invalidDocumentVerification){
        const documentCountry = {country: user?.profile?.location_country} // "GB"
        stages.push({
            name: "documentCapture",
            options: {
                documentTypes: {
                passport: documentCountry,
                driving_license: documentCountry,
                national_identity_card: documentCountry,
                residence_permit: documentCountry,
                },
            },
        })
    }
    

    useEffect(() => {
        if(isFormVerified && !verificationCompleted && complyCubeToken){
            openComplyCube()
        }
    }, [isFormVerified, verificationCompleted, complyCubeToken])

    useEffect(() => {
        if(!verificationCompleted){
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
                console.log("Capture complete", data)
                const listOfData = []
                if(data?.documentCapture){
                    listOfData.push(
                        http.put('/verification-token-experience',{
                            verificationId: documentVerification.id,
                            verificationData: data
                            // verificationData: data?.documentCapture
                        })
                    )
                }
                if(data?.faceCapture){
                    listOfData.push(
                        http.put('/verification-token-experience',{
                            verificationId: idVerification.id,
                            verificationData: data
                            // verificationData: data?.faceCapture
                        })
                    )
                }
                Promise.all(listOfData)
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {
                        refreshUserDetails()
                        complycube.updateSettings({ isModalOpen: false })
                        toastAction({
                            show: true,
                            type: "info",
                            timeout: 10000,
                            title: "Great News",
                            message: "You ID verification is now in progress"
                        })
                    })
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

    // !invalidIdVerification && !invalidDocumentVerification

    if(verificationCompleted){
        return (
        <>
            {!invalidIdVerification ? <p>✅ Identity Verification</p> : null}
            {!invalidDocumentVerification ? <p>✅ Document upload</p> : null}
        </>
        )
    }

    if(!complyCubeToken){
        return null
    }

    return <div id="complycube-mount"></div>
}