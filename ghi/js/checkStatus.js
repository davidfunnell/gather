// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get('jwt_access_payload');
if (payloadCookie) {
  // The cookie value is a JSON-formatted string, so parse it
//   const encodedPayload = JSON.parse(payloadCookie.value);

  // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(payloadCookie.value);

  // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload);

  // Print the payload
//   console.log(payload);

  // Check if "events.add_conference" is in the permissions.
  if (payload.user.perms.includes("events.add_conference")){
    const loggedInConferenceTag = document.getElementById("loggedInConference");
    loggedInConferenceTag.classList.remove("d-none");
  }
  // If it is, remove 'd-none' from the link

  if (payload.user.perms.includes("events.add_location")){
    const loggedInLocationTag = document.getElementById("loggedInLocation");
    loggedInLocationTag.classList.remove("d-none");
}
  // Check if "events.add_location" is in the permissions.
  // If it is, remove 'd-none' from the link

}
