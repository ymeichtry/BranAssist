package ch.branassist.service;

import ch.branassist.model.User;

public interface UserService {
    User findByEmail(String email);
    User saveUser(User user);
}
