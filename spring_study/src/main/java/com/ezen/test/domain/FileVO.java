package com.ezen.test.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class FileVO {
	
	private String uuid;
	private String save_dir;
	private String file_name;
	private int file_type;
	private int bno;
	private Long file_size;
	private String reg_date;

}
