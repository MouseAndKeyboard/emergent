# Minecraft Stack

Turn‑key, dockerised PaperMC server with Dynmap, automatic hardcore bans, backups and optional Prometheus/Grafana monitoring.

## Quick start

```bash
git clone <your‑repo> minecraft-stack && cd minecraft-stack
cp .env.example .env          # edit domains, passwords
cd plugin-src && ./gradlew shadowJar
cd ..                         # back to repo root
docker compose up -d          # boot everything
```

---
Pre‑generate the 20k × 20k world
```bash
docker exec -it mc rcon-cli "chunky radius 10000"
docker exec -it mc rcon-cli "chunky start"
```

---

### How to use

1. **Clone / copy** the structure above into a new Git repository.  
2. **Replace** `example.com` domains, passwords and `FILL‑ME` placeholders in `.env`, `nginx/map.conf`, and monitoring stack.  
3. **Build the plugin** once (`./gradlew shadowJar`).  
4. `docker compose up -d` – that’s it.  
5. (Optional) `docker-compose -f monitoring/docker-compose.monitor.yml up -d` to launch the metrics stack.
---