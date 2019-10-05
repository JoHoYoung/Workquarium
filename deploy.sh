 docker build -t test:0.1 .
 docker run -it --rm --name test \
    --net=host \
    test:0.1