package com.adopcion.adopcion.models;

public class Greeting {
    private String nameContent;
    private String messageContent;

    public Greeting(String nameContent, String messageContent) {
        this.nameContent = nameContent;
        this.messageContent = messageContent;
    }

    public String getNameContent() {
        return nameContent;
    }

    public String getMessageContent() {
        return messageContent;
    }
}
