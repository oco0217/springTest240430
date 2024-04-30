package com.ezen.test.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class PagingVO {
	
	//select * from board limit 0,10; 
	//DB에 들어갈 데이터를 넣어야 되기때문에 VO로 만든다
	
	//PageNo / qty
	//검색 => type / keyword

	
	private int PageNo;
	private int qty; //한 화면에 보여줄 게시글 수
	
	private String type;
	private String keyword;
	
	public PagingVO() {
		this.PageNo = 1;
		this.qty = 10;
	}
	
	public int getPageStart() {
		//DB상에서 limit의 시작 번지를 구하는 메서드
		//1=>0 2=>10 3=> 20 ....
		return (this.PageNo-1) * this.qty;
	}
	
	//여러가지의 타입을 같이 검색하기 위해서 타입을 배열로 구분
	//tcw = [t] [c] [w]
	public String[] getTypeToArray() {
		return this.type == null ? new String[] {} : this.type.split("");
	}
	
	
	
	
	
	
	
}
