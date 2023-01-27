import styled from "styled-components";

export default styled.div`

.page-content {
    .notif-header {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;

        .mark-all-btn button {
            border: none;
            background: #397c5d;
            color: #fff;
            border-radius: 5px;
            font-weight: bold;
            padding: 10px 20px;
            cursor: pointer;
        }
    }
    .notifications {
        .notif-body {
            padding: 10px;
            background-color: white;
            margin: 10px auto;
            border: 1px solid lightgrey;
            .message-container {
                display: grid;
                grid-template-columns: 0fr 1fr auto;
                gap: 10px;
                .notif-message {
                    font-size: 16px;
                    padding-bottom: 10px;
                    padding-right: 20px;
                }&.grey-out {color: grey;}
                .notif-date {
                    font-weight: lighter;
                    font-size: 12px;
                    /* white-space: nowrap; */
                    min-width: 120px;
                }
                .btn-container {
                    font-weight: bold;
                    color: #383838;
                    cursor: pointer;
                }
            }

        }
    }
}

`