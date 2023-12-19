package com.jsg.ahispringboot.common;


import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public class ExpendsResponseDTO extends ResponseDTO {

    private ExpendsProps expendsProps;

    private PageDTO pageInfo;

    @Builder(builderMethodName = "expendsResponseBuilder")
    public ExpendsResponseDTO(HttpStatus status, String message, Object data, ExpendsProps expendsProps, PageDTO pageDTO) {
        super(status, message, data);
        this.expendsProps = expendsProps;
        this.pageInfo = pageDTO;
    }
}
