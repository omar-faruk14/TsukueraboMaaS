import { NextResponse } from "next/server";
import axios from "axios";

const kintoneUrl = "https://emi-lab-osaka.cybozu.com/k/v1";
const apiToken = "Cw6JqsILemnOUjk6CJMN0hAezXuqiuBYe6te5Xqd";
const appId = 62;

export async function GET(request, { params }) {
  const { location_id } = params;

  try {
    const query = `location_id = "${location_id}"`;
    const getRecordsResponse = await axios.get(
      `${kintoneUrl}/records.json?app=${appId}&query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "X-Cybozu-API-Token": apiToken,
        },
      }
    );

    const records = getRecordsResponse.data.records;

    // if (!records || records.length === 0) {
    //   return NextResponse.json({ error: "No records found" });
    // }

    // Map through records and structure the response
    const results = records.map((record) => ({
      Record_number: record.Record_number.value,
      id: record.id.value,
      Facilities_detail_title: record.Facilities_detail_title.value,
      Facilities_detail_description: record.Facilities_detail_description.value,
      location_id: record.location_id.value,
      Facilities_detail_image: record.Facilities_detail_image.value,
      Facilities_Details_Link: record.Facilities_Details_Link.value,
      location_title: record.location_title.value,
    }));

    const sortedResults = results.sort((a, b) => a.id - b.id);

    return NextResponse.json(sortedResults);
  } catch (error) {
    console.error("Error retrieving records:", error);
    return NextResponse.json({ error: "Error retrieving records" });
  }
}
