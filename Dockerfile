# ── Build: gera os arquivos estáticos do Vite ───────────────
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# URL da API embutida no bundle. Vazio => chamadas na MESMA origem
# (/api/contact), servidas pelo proxy reverso do Nginx para o backend.
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ── Produção: Nginx servindo os estáticos + proxy /api ──────
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
