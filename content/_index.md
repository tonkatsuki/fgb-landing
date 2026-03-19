+++
draft =  false
date = 2026-03-18
type = "simple"
showAuthor = false
showDate = false
showWordcount = false
+++

{{< alert "discord" >}}
Meowdy! How about you [join us on discord](https://discord.gg/FreMaZDFbB) :3c
{{< /alert >}}

><p>Playing every Tues/Sat @ <span id="event-time"></span></p>
>
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const eventTime = new Date("2025-01-01T18:00:00-06:00"); // 6pm CST
    const formatted = eventTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    });
    document.getElementById("event-time").textContent = formatted;
  });
</script>


<link rel="stylesheet" href="css/schemes/servers_styles.css">
<div id="server-data"></div>
<script src="scripts/js/fetch_servers_data.js"></script>