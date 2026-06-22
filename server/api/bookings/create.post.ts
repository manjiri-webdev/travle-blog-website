import { pool } from "../../db/index"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { pickup_location, travel_date, mobile_number } = body;

 // Date validation
  const selectedDate = new Date(travel_date);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    throw createError({
      statusCode: 400,
      statusMessage: "Travel date cannot be in the past",
    });
  }

  // Mobile validation
  if (mobile_number.length !== 10 || isNaN(Number(mobile_number)) ){
    throw createError({
      statusCode: 400,
      statusMessage: "Mobile number must be exactly 10 digits",
    });
  }

  const result = await pool.query(
    `
      INSERT INTO bookings
      (
        pickup_location,
        travel_date,
        mobile_number
      )
      VALUES ($1,$2,$3)
      RETURNING *
    `,
    [
      pickup_location,
      travel_date,
      mobile_number
    ]
  );

  return {
    success: true,
    booking: result.rows[0],
  };
});