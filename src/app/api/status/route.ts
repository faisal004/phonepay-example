import { NextRequest, NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";

export async function POST(req: NextRequest) : Promise<NextResponse>{
    try {
        const { id} = await req.json();

        const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;
        const transactionId = id;

        const st = `/pg/v1/status/${merchantId}/${transactionId}` + process.env.NEXT_PUBLIC_SALT_KEY;

        const dataSha256 = sha256(st).toString();

        const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
        console.log(checksum);

        const options = {
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_PHONE_PAY_HOST_URL}/pg/v1/status/${merchantId}/${transactionId}`,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID": `${merchantId}`,
            },
        };

        const response = await axios.request(options);
        console.log("r===", response);

        if (response.data.code === "PAYMENT_SUCCESS") {              
           
            return new NextResponse(response.data.code, { status: 200 });
        } else {
         
            return new NextResponse("FAIL", { status: 200 });
        }
    } catch (error) {
        console.error("Error in payment status check:", error);

        return NextResponse.redirect("https://faisalhusa.in", {
            status: 301,
        });
    }
}