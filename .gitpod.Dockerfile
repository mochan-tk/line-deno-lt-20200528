FROM gitpod/workspace-full

USER gitpod

### Google Cloud ###
# not installed via repository as then 'docker-credential-gcr' is not available
ARG GCS_DIR=/opt/google-cloud-sdk
ENV PATH=$GCS_DIR/bin:$PATH
RUN sudo chown gitpod: /opt \
    && mkdir $GCS_DIR \
    && curl -fsSL https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-245.0.0-linux-x86_64.tar.gz \
    | tar -xzvC /opt \
    && /opt/google-cloud-sdk/install.sh --quiet --usage-reporting=false --bash-completion=true \
    --additional-components docker-credential-gcr alpha beta \
    && docker-credential-gcr configure-docker

### Deno ###
ENV DENO_VERSION=0.2.5

RUN curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno_linux_x64.gz --output deno.gz && \
    gunzip deno.gz && \
    chmod 777 deno && \
    sudo mv deno /usr/bin/deno && \
    sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENTRYPOINT ["deno", "https://deno.land/thumb.ts"]
